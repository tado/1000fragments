uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.94 + t * 3.31 + ph) + sin(p.y * 13.28 - t * 3.50 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.69;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.10, vec3(0.58, 0.43, 0.47), vec3(0.37, 0.32, 0.38), vec3(1.21, 1.00, 1.29), vec3(0.27, 0.77, 0.96));
	col = mod(col * 2.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
