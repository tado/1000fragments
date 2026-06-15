uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.98 + vec2(t * 1.36, -t * 1.36) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.98 + sr * 5.50 - t * 1.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.48) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.09);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.89 + time * 0.18, vec3(0.45, 0.56, 0.40), vec3(0.40, 0.31, 0.33), vec3(1.01, 1.32, 0.99), vec3(0.39, 0.37, 0.63));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
