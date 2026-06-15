uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.04 + sr * 16.70 - t * 0.68 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.50 + t * 1.24 + ph) + sin(p.y * 12.06 - t * 3.35 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.43;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.07);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.59 + time * 0.10, vec3(0.41, 0.42, 0.41), vec3(0.36, 0.32, 0.37), vec3(0.95, 1.29, 0.75), vec3(0.44, 0.09, 0.69));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
