uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.64 + sr * 21.89 - t * 0.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.01;
	p = fract(p * 1.95) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.30, vec3(0.43, 0.47, 0.42), vec3(0.37, 0.38, 0.49), vec3(1.33, 1.22, 0.72), vec3(0.06, 0.41, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
