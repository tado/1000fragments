uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.18 - t * 7.08 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.20, 0.0)) * 39.32 - t * 6.66 + ph);
    float mb = sin(length(p + vec2(0.20, 0.0)) * 39.36 - t * 6.66 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.83);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.74 + time * 0.09, vec3(0.46, 0.47, 0.45), vec3(0.39, 0.46, 0.50), vec3(1.01, 1.24, 1.12), vec3(0.81, 0.26, 0.08));
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
