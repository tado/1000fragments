uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.44 + sr * 10.70 - t * 2.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.71 * fr * fr; }
	p = abs(p) - 0.57;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.46));
	p = fract(p * 1.39) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.04, vec3(0.43, 0.49, 0.44), vec3(0.38, 0.41, 0.33), vec3(0.90, 1.34, 1.34), vec3(0.57, 0.27, 0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
