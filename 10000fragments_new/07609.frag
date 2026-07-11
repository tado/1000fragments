uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.77 + 0.41 * sin(t * 0.77)) + vec2(-0.87, -0.26) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 18; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 18.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.69), cos(time * 0.76)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.79 / 3.1415927, 0.38 / r - time * 2.57);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.59 + time * 0.21);
	col *= clamp(r * 2.96, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
