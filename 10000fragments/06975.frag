uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 18.88 - t * 4.39 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 29.34 - t * 4.39 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.56 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.93 + time * 0.25, vec3(0.52, 0.46, 0.58), vec3(0.40, 0.38, 0.38), vec3(1.34, 0.79, 0.95), vec3(0.20, 0.43, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
