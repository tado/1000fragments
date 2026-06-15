uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.82 + sr * 14.73 - t * 1.22 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.30;
	p = abs(p) - 0.78;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.01, vec3(0.56, 0.51, 0.49), vec3(0.45, 0.30, 0.38), vec3(0.74, 0.89, 1.17), vec3(0.66, 0.90, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
