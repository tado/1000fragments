uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.95 + 0.41 * sin(t * 0.73)) + vec2(-0.55, -0.21) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.34), cos(time * 1.33)) * 0.22;
	float an = atan(p.y, p.x) + time * 0.57;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.75 / 3.1415927, 1.21 / r - time * 2.57);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.95, 0.63, 0.57) * (0.09 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.47, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
