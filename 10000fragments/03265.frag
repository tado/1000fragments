uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 13.34 - t * 4.48 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 11.91 - t * 4.48 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.59 + sin(p.y * 2.36 + t * 5.42) * 4.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.13;
	p = fract(p * 2.26) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = d1 + d2;
	vec3 col = palette(d * 1.77 + time * 0.01, vec3(0.58, 0.54, 0.41), vec3(0.47, 0.48, 0.48), vec3(1.34, 0.88, 1.36), vec3(0.16, 0.29, 0.06));
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
