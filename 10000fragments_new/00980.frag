uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.35 + sr * 6.70 - t * 4.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.80 + time * 0.28, vec3(0.57, 0.56, 0.44), vec3(0.39, 0.43, 0.40), vec3(0.93, 0.86, 1.18), vec3(1.00, 0.19, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
