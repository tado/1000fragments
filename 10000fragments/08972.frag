uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.78 + t * 5.54 + ph) + sin(p.y * 4.09 - t * 1.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	{ p = vec2(atan(p.y, p.x) * 1.87, length(p) * 3.76 - time * 0.22); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.86 + time * 0.15, vec3(0.40, 0.53, 0.60), vec3(0.39, 0.36, 0.46), vec3(1.08, 1.30, 0.80), vec3(0.10, 0.22, 0.33));
	col = mod(col * 1.22, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
