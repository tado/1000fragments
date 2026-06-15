uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.12 + sr * 4.17 - t * 2.32 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.08 + sin(p.y * 5.90 + t * 1.77) * 1.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.70;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = d1 + d2;
	vec3 col = palette(d * 0.81 + time * 0.15, vec3(0.57, 0.47, 0.50), vec3(0.33, 0.48, 0.38), vec3(1.06, 0.91, 1.33), vec3(0.11, 0.05, 0.41));
	col = mod(col * 2.03, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
