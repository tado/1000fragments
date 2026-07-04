uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.29 + sr * 7.27 - t * 3.52 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.80) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 4.00 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	p *= 3.11;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.02);
	float d = d1 * d2;
	vec3 col = palette(d * 1.43 + time * 0.17, vec3(0.46, 0.42, 0.43), vec3(0.40, 0.37, 0.36), vec3(0.87, 1.03, 0.92), vec3(0.61, 0.52, 0.75));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
