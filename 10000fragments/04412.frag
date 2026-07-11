uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.38, 0.0)) * 37.36 - t * 2.70 + ph);
    float mb = sin(length(p + vec2(0.38, 0.0)) * 8.50 - t * 2.70 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.53) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.58 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.01, vec3(0.53, 0.52, 0.48), vec3(0.43, 0.35, 0.47), vec3(0.70, 0.70, 0.72), vec3(0.03, 0.61, 0.01));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
