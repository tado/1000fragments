uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.88 + 0.17 * sin(t * 0.78)) + vec2(-0.66, 0.11) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.12), cos(time * 1.26)) * 0.14;
	float an = atan(p.y, p.x) + time * -0.57;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.76 / 3.1415927, 1.21 / r + time * 0.61);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.17, 0.93, 0.27) * (0.16 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.72, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
