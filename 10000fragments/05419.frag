uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.16 + jf * 4.0), cos(t * 0.30 * jf)) * 0.83;
        xs += sin(length(p - im) * 152.23 - t * 7.75 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	p += vec2(0.77, -0.04) * sin(length(p) * 5.12 - time * 0.85) * 0.21;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.03, vec3(0.44, 0.41, 0.48), vec3(0.45, 0.48, 0.38), vec3(1.22, 1.17, 1.11), vec3(0.72, 0.99, 0.15));
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
