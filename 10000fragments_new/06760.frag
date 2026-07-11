uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 14.88 - t * 7.00 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 17.92 - t * 4.32 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.06 + t * 4.54 + ph) + sin(p.y * 9.70 - t * 1.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.79;
	p *= 2.37;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.90 + time * 0.03, vec3(0.49, 0.49, 0.56), vec3(0.47, 0.31, 0.35), vec3(1.02, 0.87, 1.04), vec3(0.64, 0.70, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
