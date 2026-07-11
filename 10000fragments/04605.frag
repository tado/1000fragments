uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 11.97 - t * 1.46 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 14.22 - t * 1.46 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.11, vec3(0.54, 0.47, 0.43), vec3(0.30, 0.41, 0.48), vec3(1.23, 1.28, 1.36), vec3(0.05, 0.64, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
