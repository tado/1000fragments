uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.86 + t * 1.64 + ph) + sin(p.y * 13.50 - t * 4.70 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	p *= 2.60;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.51));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.26 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
