uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.33 + 0.12 * cos(sa * 8.0 + t * 1.21 + ph);
    v = sin((sr - petal) * 15.98);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.51) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 0.57 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 27.5) + 0.5) / 27.5;
	p.y += sin(p.x * 6.78 + time * 1.63) * 0.27;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.25 + time * 0.02, vec3(0.42, 0.41, 0.59), vec3(0.49, 0.46, 0.34), vec3(1.00, 0.83, 1.18), vec3(0.97, 0.77, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
