uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.88 + sr * 12.61 - t * 3.91 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.95 + sr * 8.11 - t * 3.56 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.14);
	float d = d1 + d2;
	vec3 col = palette(d * 1.07 + time * 0.21, vec3(0.54, 0.47, 0.52), vec3(0.39, 0.36, 0.38), vec3(0.80, 1.08, 1.30), vec3(0.63, 0.11, 0.48));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
