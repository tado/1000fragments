uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.13 * cos(sa * 3 + t * 1.32 + ph);
    v = sin((sr - petal) * 12.04);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 10.07 - t * 6.46 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 18.45 - t * 6.46 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.30);
	float d = d1 * d2;
	vec3 col = palette(d * 0.85 + time * 0.12, vec3(0.50, 0.59, 0.59), vec3(0.49, 0.43, 0.39), vec3(1.08, 1.33, 1.27), vec3(0.52, 0.53, 0.88));
	col = fract(col * 1.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
