uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.63 + 0.19 * sin(t * 1.13)) + vec2(-0.25, 0.18) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 24; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 24.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.02;
	p = (floor(p * 24.1) + 0.5) / 24.1;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.79, 0.79, 0.92) * (0.18 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = mod(col * 2.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
