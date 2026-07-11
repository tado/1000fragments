uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.56 + jf * 4.0), cos(t * 0.51 * jf)) * 0.64;
        xs += sin(length(p - im) * 152.11 - t * 6.32 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.25, vec3(0.44, 0.45, 0.47), vec3(0.39, 0.33, 0.45), vec3(1.18, 0.76, 1.11), vec3(0.96, 0.90, 0.44));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.95 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
