uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.04 + sr * 21.19 - t * 1.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	p = fract(p * 1.24) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.11, vec3(0.46, 0.52, 0.50), vec3(0.50, 0.30, 0.50), vec3(0.71, 1.32, 1.38), vec3(0.23, 0.92, 0.38));
	col = mod(col * 1.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
