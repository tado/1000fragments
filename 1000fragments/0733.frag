uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.16 + sr * 9.34 - t * 4.77 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.25 + t * 4.37 + ph) + sin(p.y * 2.09 - t * 1.54 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.39);
	float d = d1 + d2;
	vec3 col = palette(d * 1.03 + time * 0.27, vec3(0.52, 0.49, 0.54), vec3(0.33, 0.38, 0.39), vec3(0.97, 0.84, 1.04), vec3(0.90, 0.47, 0.19));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
