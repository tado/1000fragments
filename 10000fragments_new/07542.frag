uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.90 + 0.50 * sin(t * 1.28)) + vec2(-0.36, -0.28) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 25; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 25.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.04;
	p.y += sin(p.x * 2.16 + time * 3.79) * 0.23;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.32, 0.32, 0.11), vec3(0.55, 0.92, 0.92), d);
	col *= 0.86 + 0.12 * sin(gl_FragCoord.y * 1.22 + time * 5.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
