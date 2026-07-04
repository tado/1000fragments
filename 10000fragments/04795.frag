uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.73 + 0.20 * sin(t * 0.41)) + vec2(-0.27, 0.02) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.65), cos(time * 0.45)) * 0.20;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.68 / 3.1415927, 0.90 / r + time * 1.23);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.23, 0.40, 0.24), vec3(0.98, 0.89, 0.56), cc);
	col *= clamp(r * 2.76, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
