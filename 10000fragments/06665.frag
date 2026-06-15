uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 15.27 - t * 3.60 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 26.17 - t * 3.60 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	{ float fr = length(p); p *= 1.0 + -0.76 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.22; p = rot2(1.02) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.61 + time * 0.28, vec3(0.43, 0.52, 0.50), vec3(0.33, 0.31, 0.45), vec3(0.86, 0.94, 0.92), vec3(0.91, 0.81, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
