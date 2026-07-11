uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.16 + t * 1.59 + ph) * 0.7;
    float wb = sin(p.y * 16.17 - t * 1.40 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.63;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.07, 0.30, 0.43), vec3(0.51, 0.87, 0.61), d);
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.05 + time * 13.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
