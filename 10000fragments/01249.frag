uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.58 + t * 2.51 + ph) + sin(p.y * 5.32 - t * 2.51 + ph)
        + sin((p.x + p.y) * 5.26 + t * 2.51 + ph) + sin(length(p) * 15.67 - t * 2.51 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.12, 0.06, 0.59), vec3(0.76, 0.74, 0.91), d);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
