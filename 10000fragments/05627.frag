uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 30.33 - t * 7.21 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 22.97 - t * 7.21 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = abs(p);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.44; p = rot2(0.37) * p; }
	{ float fr = length(p); p *= 1.0 + 0.41 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 2.00 + time * 0.04, vec3(0.52, 0.43, 0.47), vec3(0.37, 0.42, 0.33), vec3(1.09, 1.04, 0.79), vec3(0.96, 0.51, 0.24));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
