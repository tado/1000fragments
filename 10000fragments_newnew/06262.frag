uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.95 + t * 0.86 + ph) * 0.7;
    float wb = sin(p.y * 17.86 - t * 3.31 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.30;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.70;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.89, 0.93, 0.55) * (0.09 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.70 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
