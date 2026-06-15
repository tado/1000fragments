uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.52 + sr * 21.37 - t * 0.51 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.70 + sr * 8.75 - t * 2.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.65);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.00 + time * 0.27, vec3(0.58, 0.52, 0.41), vec3(0.48, 0.48, 0.41), vec3(1.24, 1.31, 1.06), vec3(0.36, 0.45, 0.40));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
