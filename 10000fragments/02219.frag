uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.05 + sr * 15.34 - t * 4.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.92;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.66 + time * 0.04, vec3(0.55, 0.46, 0.46), vec3(0.34, 0.30, 0.36), vec3(1.28, 1.07, 1.04), vec3(0.93, 0.28, 0.50));
	col = fract(col * 2.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
