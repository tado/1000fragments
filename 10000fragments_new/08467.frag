uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.74 + 0.35 * sin(t * 1.11)) + vec2(-0.53, -0.07) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 18; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 18.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.68 + time * 0.25, vec3(0.52, 0.55, 0.57), vec3(0.40, 0.31, 0.32), vec3(1.26, 1.30, 0.98), vec3(0.92, 0.57, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
