uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.97 + t * 3.60 + ph) * 0.7;
    float wb = sin(p.y * 17.33 - t * 1.45 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.75;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.11), field(p, time, 2.21));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
