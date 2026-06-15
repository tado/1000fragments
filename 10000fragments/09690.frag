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
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.13 + jf * 4.0), cos(t * 0.49 * jf)) * 0.41;
        xs += sin(length(p - im) * 149.66 - t * 5.13 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.78, -0.04) * sin(length(p) * 5.55 - time * 1.04) * 0.38;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.10; p = rot2(1.28) * p; }
	p *= 2.52;
	p = abs(p) - 0.63;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.16, vec3(0.42, 0.46, 0.41), vec3(0.44, 0.37, 0.33), vec3(0.71, 0.96, 1.13), vec3(0.05, 0.84, 0.21));
	col = fract(col * 1.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
