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
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.43 + jf * 4.0), cos(t * 0.37 * jf)) * 0.59;
        xs += sin(length(p - im) * 70.35 - t * 13.37 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.93;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.23; p = rot2(2.56) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.16, vec3(0.46, 0.42, 0.50), vec3(0.40, 0.34, 0.41), vec3(1.33, 1.14, 0.77), vec3(0.43, 0.88, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
