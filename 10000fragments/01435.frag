uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 6.02 - t * 4.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	{ p = vec2(atan(p.y, p.x) * 2.21, length(p) * 2.63 - time * 0.75); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.28, vec3(0.44, 0.60, 0.52), vec3(0.39, 0.33, 0.45), vec3(0.74, 0.77, 1.03), vec3(0.11, 0.30, 0.36));
	col = mod(col * 1.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
