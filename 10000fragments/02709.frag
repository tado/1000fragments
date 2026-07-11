uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.23 * cos(sa * 9 + t * 2.98 + ph);
    v = sin((sr - petal) * 8.32);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.03 + sr * 11.09 - t * 4.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.14);
	float d = d1 * d2;
	vec3 col = palette(d * 0.72 + time * 0.18, vec3(0.60, 0.42, 0.53), vec3(0.39, 0.40, 0.46), vec3(1.26, 0.87, 1.27), vec3(0.60, 0.52, 0.71));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
