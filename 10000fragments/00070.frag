uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.40 + t * 3.89 + ph) + sin(p.y * 11.96 - t * 2.84 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.29;
	{ p = vec2(atan(p.y, p.x) * 1.93, length(p) * 2.09 - time * 0.75); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.55 + time * 0.20);
	col = mod(col * 2.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
