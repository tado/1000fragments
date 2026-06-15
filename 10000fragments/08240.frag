uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.51 + sr * 13.48 - t * 0.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	p = fract(p * 2.08) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.25, vec3(0.51, 0.55, 0.59), vec3(0.41, 0.33, 0.43), vec3(1.00, 1.09, 1.24), vec3(0.86, 0.02, 0.65));
	col = clamp((col - 0.5) * 1.87 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
