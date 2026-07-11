uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.63 + t * 5.35 + ph) + sin(p.y * 5.03 - t * 5.75 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.63;
	{ p = vec2(atan(p.y, p.x) * 2.83, length(p) * 4.40 - time * 0.36); }
	p *= 2.47;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.54 + time * 0.05);
	col = mod(col * 2.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
