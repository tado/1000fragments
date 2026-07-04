uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.33 + t * 5.66 + ph) + sin(p.y * 13.18 - t * 0.93 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.56 + sr * 20.09 - t * 4.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.90);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.56 + time * 0.00, vec3(0.40, 0.50, 0.53), vec3(0.30, 0.32, 0.36), vec3(1.38, 1.22, 1.32), vec3(0.59, 0.39, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
