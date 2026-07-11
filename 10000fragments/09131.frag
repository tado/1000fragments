uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.75 + jf * 4.0), cos(t * 0.44 * jf)) * 0.35;
        xs += sin(length(p - im) * 177.92 - t * 6.47 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.98, length(p) * 5.48 - time * 0.62); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.28; p = rot2(0.89) * p; }
	p += vec2(-0.78, 0.02) * sin(length(p) * 4.82 - time * 1.52) * 0.28;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.01, vec3(0.47, 0.46, 0.42), vec3(0.31, 0.31, 0.41), vec3(1.18, 0.92, 1.28), vec3(0.51, 0.74, 0.02));
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
