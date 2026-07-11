uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.18 + jf * 4.0), cos(t * 0.17 * jf)) * 0.83;
        xs += sin(length(p - im) * 198.54 - t * 8.81 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.12, vec3(0.57, 0.45, 0.42), vec3(0.43, 0.44, 0.36), vec3(0.97, 0.73, 1.07), vec3(0.18, 0.26, 0.97));
	col = mod(col * 1.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
