uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.65 + sin(p.y * 4.49 + t * 1.07) * 2.98 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.52;
	{ p = vec2(atan(p.y, p.x) * 2.53, length(p) * 2.56 - time * 0.32); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.63 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
