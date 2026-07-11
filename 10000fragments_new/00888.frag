uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.83 + sr * 7.77 - t * 4.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.67;
	p = fract(p * 2.46) - 0.5;
	p = (floor(p * 25.6) + 0.5) / 25.6;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.25, vec3(0.49, 0.50, 0.42), vec3(0.49, 0.47, 0.36), vec3(0.86, 0.78, 1.22), vec3(0.85, 0.49, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
