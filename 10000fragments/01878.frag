uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.91 + t * 2.18 + ph) * 0.7;
    float wb = sin(p.y * 15.75 - t * 3.20 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.69;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	p = abs(p) - 0.62;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.49, 0.19, 0.78) * (0.24 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
