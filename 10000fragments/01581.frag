uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.82 - t * 1.85;
    v = sin(floor(lv * 4.1) / 4.1 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	p = (floor(p * 7.3) + 0.5) / 7.3;
	p = abs(p) - 0.66;
	p *= 1.97;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.00, vec3(0.58, 0.45, 0.44), vec3(0.49, 0.38, 0.32), vec3(1.14, 0.80, 1.36), vec3(0.68, 0.80, 0.20));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
