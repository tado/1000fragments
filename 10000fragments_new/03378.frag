uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.64 + 0.12 * sin(t * 0.60)) + vec2(-0.41, -0.26) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.34 / 3.1415927, 1.45 / r + time * 0.72);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.88, 0.26, 0.28) * (0.14 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.48, 0.0, 1.0);
	col = mod(col * 1.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
